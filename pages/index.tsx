import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setConfig, setManifest, setNef } from '@/redux/slice'

import axios from 'axios'
import { HomeView } from '@/components/HomeView';
import { CodeScreen } from '@/components/CodeScreen';
import { useEffect } from 'react';

export default function Home() {

  const dispatch = useAppDispatch()
  const title = useAppSelector((state: any) => state.code.title)
  const contract = useAppSelector((state: any) => state.code.contractCode)
  const nef = useAppSelector((state: any) => state.code.nef)
  const manifest = useAppSelector((state: any) => state.code.manifest)

  const config = useAppSelector((state: any) => state.code.config)


  const compileNow = async () => {
    const requestBody = {
      code: contract,
      config
    };

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_API + '/compile', requestBody);
      console.log('Response:', response.data);

      if (response.status == 200 && response.data.response.status == 200) {
        const { manifest, nef } = response.data.data
        dispatch(setManifest(JSON.stringify(manifest)))
        dispatch(setNef(nef))

        alert('Compile Successful!')
        // deployContractOnTestnet()
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      console.error('Error:', error);
      // alert('Contract Deployed on Testnet Succesfully!')
      alert((error as any)?.message ?? 'Error Compiling the Code')
    }
  }


  if (title === '') {
    return <HomeView />
  }

  return <>
    <CodeScreen />
    <dialog id="my_modal_2" className="modal">
      <form method="dialog" className="modal-box flex flex-col">
        <h3 className="font-bold text-lg">Compile Contract</h3>
        <p className="py-4">Check & Update the following config.yml</p>
        <textarea value={config} onChange={(e) => dispatch(setConfig(e.currentTarget.value))} className="textarea textarea-accent h-64" placeholder="Config"></textarea>
        <button className='btn btn-accent mt-4' onClick={compileNow}>Submit</button>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    <div className='fixed-div'>
      <div id="grill" className='chat'></div>
      <img onClick={() => {
        const grillDiv = document.getElementById('grill');

        // Toggle the 'chat-show' class on the div element
        grillDiv?.classList.toggle('chat-show');

        // Check if the class 'chat-show' is present
        if (grillDiv?.classList.contains('chat-show')) {
          // Initializing grill.
          const config = {};
          (window as any)?.GRILL?.init(config);
        }
      }} id="grill-toggle" alt="grill-logo" src="https://sub.id/images/grillchat.svg" />
    </div>

  </>
}
