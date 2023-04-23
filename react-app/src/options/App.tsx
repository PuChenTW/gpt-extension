import {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from "react";
import "./App.css";

const DefaultPrompt: string = `You are a grammar checker, if there are errors, provide the correct sentences and suggestions. Please check the following sentences:\n"""\n{{text}}\n"""`;

function App() {
  const [prompt, setPrompt] = useState(DefaultPrompt);
  const [key, setKey] = useState("");
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [language, setLanguage] = useState("en");

  const onChangePrompt = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setPrompt(e.target.value);
      chrome.storage.local.set({ prompt: e.target.value});
    },
    [setPrompt]
  );

  const onChangeKey = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setKey(e.target.value);
      chrome.storage.local.set({ key: e.target.value});
    },
    [setKey]
  );

  const onChangeModel = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setModel(e.target.value);
      chrome.storage.local.set({ model: e.target.value});
    },
    [setModel]
  );

  const onChangeLanguage = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setLanguage(e.target.value);
      chrome.storage.local.set({ language: e.target.value});
    },
    [setLanguage]
  );

  const onResetClick = useCallback(() => {
    setPrompt(DefaultPrompt);
    chrome.storage.local.set({ prompt: DefaultPrompt});
  }, [setPrompt]);

  useEffect(() => {
    chrome.storage.local.get(
      {
          key: "",
          model: "gpt-3.5-turbo",
          prompt: DefaultPrompt,
          language: "en"
      },
      ({ key, model, prompt, language }) => {
        setKey(key)
        setModel(model);
        setPrompt(prompt);
        setLanguage(language);
      }
    );
  }, [setKey, setModel, setPrompt, setLanguage]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid grid-cols-2 items-center gap-4">
        <label className="block text-sm font-medium text-gray-900">
          Primary Language
        </label>
        <select
          id="language"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          value={language}
          onChange={onChangeLanguage}
        >
          <option value="af">Afrikaans</option>
          <option value="sq">Albanian</option>
          <option value="am">Amharic</option>
          <option value="ar">Arabic</option>
          <option value="hy">Armenian</option>
          <option value="as">Assamese</option>
          <option value="ay">Aymara</option>
          <option value="az">Azerbaijani</option>
          <option value="bm">Bambara</option>
          <option value="eu">Basque</option>
          <option value="be">Belarusian</option>
          <option value="bn">Bengali</option>
          <option value="bho">Bhojpuri</option>
          <option value="bs">Bosnian</option>
          <option value="bg">Bulgarian</option>
          <option value="ca">Catalan</option>
          <option value="ceb">Cebuano</option>
          <option value="zh-CN">Chinese (Simplified)</option>
          <option value="zh-TW">Chinese (Traditional)</option>
          <option value="co">Corsican</option>
          <option value="hr">Croatian</option>
          <option value="cs">Czech</option>
          <option value="da">Danish</option>
          <option value="dv">Dhivehi</option>
          <option value="doi">Dogri</option>
          <option value="nl">Dutch</option>
          <option value="en">English</option>
          <option value="eo">Esperanto</option>
          <option value="et">Estonian</option>
          <option value="ee">Ewe</option>
          <option value="fil">Filipino (Tagalog)</option>
          <option value="fi">Finnish</option>
          <option value="fr">French</option>
          <option value="fy">Frisian</option>
          <option value="gl">Galician</option>
          <option value="ka">Georgian</option>
          <option value="de">German</option>
          <option value="el">Greek</option>
          <option value="gn">Guarani</option>
          <option value="gu">Gujarati</option>
          <option value="ht">Haitian Creole</option>
          <option value="ha">Hausa</option>
          <option value="haw">Hawaiian</option>
          <option value="he or iw">Hebrew</option>
          <option value="hi">Hindi</option>
          <option value="hmn">Hmong</option>
          <option value="hu">Hungarian</option>
          <option value="is">Icelandic</option>
          <option value="ig">Igbo</option>
          <option value="ilo">Ilocano</option>
          <option value="id">Indonesian</option>
          <option value="ga">Irish</option>
          <option value="it">Italian</option>
          <option value="ja">Japanese</option>
          <option value="jv or jw">Javanese</option>
          <option value="kn">Kannada</option>
          <option value="kk">Kazakh</option>
          <option value="km">Khmer</option>
          <option value="rw">Kinyarwanda</option>
          <option value="gom">Konkani</option>
          <option value="ko">Korean</option>
          <option value="kri">Krio</option>
          <option value="ku">Kurdish</option>
          <option value="ckb">Kurdish (Sorani)</option>
          <option value="ky">Kyrgyz</option>
          <option value="lo">Lao</option>
          <option value="la">Latin</option>
          <option value="lv">Latvian</option>
          <option value="ln">Lingala</option>
          <option value="lt">Lithuanian</option>
          <option value="lg">Luganda</option>
          <option value="lb">Luxembourgish</option>
          <option value="mk">Macedonian</option>
          <option value="mai">Maithili</option>
          <option value="mg">Malagasy</option>
          <option value="ms">Malay</option>
          <option value="ml">Malayalam</option>
          <option value="mt">Maltese</option>
          <option value="mi">Maori</option>
          <option value="mr">Marathi</option>
          <option value="mni-Mtei">Meiteilon (Manipuri)</option>
          <option value="lus">Mizo</option>
          <option value="mn">Mongolian</option>
          <option value="my">Myanmar (Burmese)</option>
          <option value="ne">Nepali</option>
          <option value="no">Norwegian</option>
          <option value="ny">Nyanja (Chichewa)</option>
          <option value="or">Odia (Oriya)</option>
          <option value="om">Oromo</option>
          <option value="ps">Pashto</option>
          <option value="fa">Persian</option>
          <option value="pl">Polish</option>
          <option value="pt">Portuguese (Portugal, Brazil)</option>
          <option value="pa">Punjabi</option>
          <option value="qu">Quechua</option>
          <option value="ro">Romanian</option>
          <option value="ru">Russian</option>
          <option value="sm">Samoan</option>
          <option value="sa">Sanskrit</option>
          <option value="gd">Scots Gaelic</option>
          <option value="nso">Sepedi</option>
          <option value="sr">Serbian</option>
          <option value="st">Sesotho</option>
          <option value="sn">Shona</option>
          <option value="sd">Sindhi</option>
          <option value="si">Sinhala (Sinhalese)</option>
          <option value="sk">Slovak</option>
          <option value="sl">Slovenian</option>
          <option value="so">Somali</option>
          <option value="es">Spanish</option>
          <option value="su">Sundanese</option>
          <option value="sw">Swahili</option>
          <option value="sv">Swedish</option>
          <option value="tl">Tagalog (Filipino)</option>
          <option value="tg">Tajik</option>
          <option value="ta">Tamil</option>
          <option value="tt">Tatar</option>
          <option value="te">Telugu</option>
          <option value="th">Thai</option>
          <option value="ti">Tigrinya</option>
          <option value="ts">Tsonga</option>
          <option value="tr">Turkish</option>
          <option value="tk">Turkmen</option>
          <option value="ak">Twi (Akan)</option>
          <option value="uk">Ukrainian</option>
          <option value="ur">Urdu</option>
          <option value="ug">Uyghur</option>
          <option value="uz">Uzbek</option>
          <option value="vi">Vietnamese</option>
          <option value="cy">Welsh</option>
          <option value="xh">Xhosa</option>
          <option value="yi">Yiddish</option>
          <option value="yo">Yoruba</option>
          <option value="zu">Zulu</option>
        </select>
        <label className="block text-sm font-medium text-gray-900">
          Your ChatGPT API Key
        </label>
        <input
          type="text"
          id="key"
          className="block rounded-md border-0 py-1.5 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={key}
          onChange={onChangeKey}
        />
        <label className="block text-sm font-medium text-gray-900">Model</label>
        <select
          id="model"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          value={model}
          onChange={onChangeModel}
        >
          <option value="gpt-4">gpt-4</option>
          <option value="gpt-4-32k">gpt-4-32k</option>
          <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
          <option value="gpt-3.5-turbo-0301">gpt-3.5-turbo-0301</option>
        </select>
        <label className="block text-sm font-medium text-gray-900">
          Prompt
        </label>
        <div>
          <textarea
            id="prompt"
            className="w-80 block text-sm p-2 rounded-md border border-gray-300 h-40"
            onInput={onChangePrompt}
            value={prompt}
          />
          <p className="font-sans text-teal-800">
            {"{{text}} will be replaced with selected text"}
          </p>
          <button
            id="reset"
            className="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onResetClick}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
