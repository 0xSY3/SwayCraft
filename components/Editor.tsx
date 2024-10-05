import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addMessages, setContractCode, setLoading, setPseudoCode } from "@/redux/slice";
import { startNewContract, systemRecord, updateSmartContract } from "@/ai/openai";
import { Play, Loader2 } from 'lucide-react';

export type EditorProps = {
  name: string;
  title: string;
  className: string;
  showAction?: boolean;
  padding?: number;
  themeName?: string;
  type: 'pseudo' | 'contract'
}

export const Editor = ({ type, name, title, padding, showAction, className }: EditorProps) => {
  const dispatch = useAppDispatch()
  const loading = useAppSelector((store) => store.code.loading)
  const pseudo = useAppSelector((store) => store.code.pseudoCode)
  const messages = useAppSelector((store) => store.code.messages)

  let text
  if (type == 'pseudo') {
    text = useAppSelector((store) => store.code.pseudoCode)
  } else {
    text = useAppSelector((store) => store.code.contractCode)
  }

  const contractCode = useAppSelector((store) => store.code.contractCode)
  const purpose = useAppSelector((store) => store.code.title)

  const updateText = (t: string) => {
    if (type == 'pseudo') {
      dispatch(setPseudoCode(t))
      return
    }
    dispatch(setContractCode(t))
  }

  const convertFurther = async () => {
  }

  return (
    <div className="flex flex-1 w-full bg-black border border-green-800/30 flex-col mb-4" style={{ paddingRight: padding }}>
      <div className="flex flex-row w-full justify-between items-center p-2 border-b border-green-800/30">
        <h1 className="text-2xl p-2 font-bold text-green-400">{title}</h1>
        {showAction && (
          <button
          disabled={loading}
          onClick={convertFurther}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-bold transition-colors duration-200 flex items-center gap-2 disabled:bg-green-800 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Converting...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Convert</span>
            </>
          )}
        </button>
        )}
      </div>
      <AceEditor
        style={{ width: '100%' }}
        className={`bg-black flex-1 w-full ${className}`}
        value={text}
        mode="rust"
        theme="monokai"
        fontSize={16}
        onChange={updateText}
        showGutter
        wrapEnabled
        showPrintMargin={false}
        highlightActiveLine
        name={name}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </div>
  )
} 