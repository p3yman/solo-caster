import { useLocalStorage } from "@uidotdev/usehooks";
import { ReactNode, createContext, useContext } from "react";

type TextAlign = "left" | "center" | "right";
type Direction = "ltr" | "rtl";

interface SettingsValues {
  content: string;
  fontSize: number;
  vMargin: number;
  hMargin: number;
  lineSpacing: number;
  speed: number;
  textAlign: TextAlign;
  direction: Direction;
  showIndicator: boolean;
  scrolling: boolean;
  recording: boolean;
  showCamera: boolean;
  showGrid: boolean;
  showTeleprompter: boolean;
}

export interface SettingsContextType extends SettingsValues {
  setContent: (content: string) => void;
  setFontSize: (fontSize: number) => void;
  setVMargin: (vMargin: number) => void;
  setHMargin: (hMargin: number) => void;
  setLineSpacing: (lineSpacing: number) => void;
  setSpeed: (speed: number) => void;
  setTextAlign: (textAlign: TextAlign) => void;
  setDirection: (direction: Direction) => void;
  setShowIndicator: (showIndicator: boolean) => void;
  setScrolling: (scrolling: boolean) => void;
  setRecording: (recording: boolean) => void;
  setShowCamera: (cameraPreview: boolean) => void;
  setShowgitGrid: (grid: boolean) => void;
  setShowTeleprompter: (showTeleprompter: boolean) => void;
  reset: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

const initialValue: SettingsValues = {
  content: `عنوان: مبانی رو یاد بگیریم، برای فریم‌ورک‌ها همیشه وقت هست!
شاید ۱۵ یا ۲۰ سال پیش، یه عطش خاصی واسه پیدا کردن ابزارها یا تکنولوژی‌های جدید وجود داشت و گاهی فاصله زمانی بین اومدن ۲ تا ابزار خوب جدید خیلی زیاد بود.
ولی الان دیگه اونجوری نیست، صبح پا میشی، ایمیلت رو چک می‌کنی. تو یکی از این خبرنامه‌های تکنولوژی -آره من همچنان خبرنامه‌ها رو دنبال می‌کنم، ولی اون باشه واسه یه ویدئو دیگه-
---
میگفتم، تو یکی از این خبرنامه‌های تکنولوژی میبینی نوشته ۲۰ تا ابزار جدید جاوااسکریپت که این ماه اومده. سر جدت ول کن! فقط این ماه؟
جدی چه جوری باید همه اینا رو دنبال کنیم؟ واقعا به این همه لایبراری کوچیک و npm packageها و مثلا فریم‌ورک‌ها احتیاج داریم؟
می‌دونم، این ابزارها زندگی‌مون رو راحت‌تر می‌کنن و فقط برای اینکه هی چیز جدید امتحان کنیم یا واسه یکی بازار ساختن آموزش و crash course و پست بلاگ نیستش. مشکل من هم اصلا ابزار جدید نیست، مشکل من استرس ندونستن و استفاده نکردن از این کشفیات روزانه‌ست.
---
سلام، من پیمان هستم و امروز می‌خوایم در مورد حجم زیاد ابزارهایی صحبت کنیم که ما تو ترس از دست دادن یادگرفتن‌شون میندازن و اینکه چطوری با این مشکل مواجه بشیم و حتی ازش بگذریم
اگه ویدئوهای این شکلی به دردتون میخوره، میتونید سابسکرایب کنید که کلی از این چیزا تو راهه. اگه میخواین زودتر ببینین هم که زنگوله رو برای همین ساختن. بریم واسه ادامه ویدئو
---
فکر کنم همه‌مون با این حس آشنا هستیم. تو مثلا لینکدین دنبال کار می‌گردیم، یه پوزیشن خوب هم پیدا می‌کنیم. لوکیشن، حقوق و scale همه چی عالیه. بعد میرسی به بخش «ما از شما چی می‌خوایم» و یه لیست بلند بالا می‌بینی از تکنولوژی‌های استک‌شون. ممکنه با Vue.js کار کرده باشی ولی اون React می‌خوان. تو ممکنه TDD رو با Jest کار کرده باشی ولی اونا رفتن سراغ Mocha + Chai (واقعا ترکیب اسم از این بامزه‌تر داریم؟)
---
حس بدیه، نه؟ چندین سال تجربه و الان دوباره یه جونیور حساب میشی؟ نه بابا! این چه حرفیه. بیشتر چیزهایی که بلدی بازم به کارت میاد، ولی نکته مهم اینه که چطوری واقعا. راهش چیه؟ اینکه مبانی رو درست یاد بگیری.
---
حالا مبانی یا fundamentals اصلا چی هست؟
---
این روزا دورمون پر شده از دوره آموزشی و کرش کورس و پلی لیست‌های مختلف که بهت قول می‌دن یه چیزی مثل React یا بدتر از اون Gatsby رو خیلی سریع می‌تونی یاد بگیری، یه چیزی مثل ۲-۳ ساعت.
خودت هم می‌دونی اگه تازه شروع کردی نباید ممکن باشه. پس چرا این محتواها اینقد طرفدار دارن؟
تابلوئه. به همون دلیل که محتواهای کاهش وزن و لاغر شدن طرفدار دارن. کار هم نمی‌کنن، واقعیتش اونجوری که فکر می‌کنیم کار نمی‌کنن. 
اینجور دوره‌ها وقتی می‌خوای یه ایده‌ای در مورد یه چیز جدید پیدا کنی خوبه، خیلی هم خوبه. مثلا بک‌اند دولوپری و می‌خوای دستت بیاد تو فرانت‌اند چه خبره. خب صرف ۴۰ ۵۰ ساعت اینجا ممکنه اصلا منطقی نباشه. 
اگه می‌خواین مثلا برای خودتون یه وب‌سایت شخصی بسازین، خوب منطقا یه کرش کورس ۳ ساعته کارتون رو راه میندازه تا خیلی سریع همه چی رو جمع و جور کنین. ولی اگه می‌خواین واقعا اون تکنولوژی یا زبان رو یاد بگیرین، این میتونه مسیر اشتباهی باشه. نگاه کنی ۴ ساعت حتی برای سرسری خوندن داکیومنت‌ها هم کافی نیست، چه برسه به یاد گرفتنش.
مشکل هم فقط به پلی‌لیست های یوتوب یا آموزش‌های خیلی طولانی محدود نمیشه. حتی کورس‌های سایت‌هایی مثل Udemy هم میتونن دقیقا همین مشکل رو داشته باشن. یه دوره‌ی ۵۰ ساعته‌ی ری‌اکت هم ممکنه رو اعصاب‌ترین جملات ممکن رو داشته باشن مثل «نگران این بخشش نباشین» یا «همینقدر بدونین ری‌اکت بقیه‌ش رو هندل می‌کنه». این دیگه اسمش یادگیری نیستش، اینه که همراهش یه سری چیز میز تایپ می‌کنی و همون خروجی رو می‌بینی.
---
من هم نیومدم ناامیدتون کنم. در مورد مشکل حرف زدیم، حالا وقتشه ببینیم راه حل چیه.
---
چی کار می‌تونیم بکنیم؟
اول اینکه، کانسپت‌ها رو درک کنیم
فریم‌ورک و کتابخونه‌های امروزی بیشتر از اون چیزی که فکرش رو بکنین ایده‌های مشترک با هم دارن. شما الان هر مقایسه‌ای بین فریم‌ورک‌ها رو بخونی تا بهترینش رو برای خودت انتخاب کنی، یه لیستی از شباهت‌ها می‌بینی و آخرش هم نتیجه‌شون اینه که هر کدوم رو می‌خوای خودت انتخاب کن. خب خسته نباشی.
مثلا اگه دقت کنی، میبینی جفت Vue و React کانسپت کامپوننت‌ها رو دارن. یه بلاک کدی که ممکنه یه سری دیتا بگیرن و یه سری دیتا پس بدن، استایل داشته باشن و مهم‌تر از اون بارها و بارها استفاده بشن. وقتی کامپوننت‌ها رو تو یکیشون یاد بگیری -یعنی واقعا درک کنی- اون موقع‌ست که مشکلی باهاش تو یه فریم‌ورک دیگه هم نداری. همین رو می‌تونی به کلی بخش دیگه هم بسط بدی. State management یا Routing هم دقیقا همینه. پس خیلی مهمه که کانسپت‌های مشترک این ابزارها رو درک کنیم تا دانش‌مون قابلیت ترجمه به باقی‌شون رو هم داشته باشه.
---
عمیق بشیم
---
من واقعا مشکلی با استفاده از کرش کورس‌ها ندارم چون خیلی اوقات فقط می‌خوای بدونی تو یه ابزار چه خبره و چی کار می‌کنه اصلا. خودم هم همیشه از این روش واسه امتحان کردن چیزهای جدید استفاده می‌کنم. فقط یادتون باشه بر اساس نیازتون باید و باید عمیق‌تر وارد ماجرا بشین.
همیشه میتونین روی داکیومنت‌های رسمی اون ابزار حساب کنین. خیلی‌هاشون حتی بخش‌هایی دارن که توضیح دقیق‌تری در مورد ایده‌ها دارن و اینکه اصلا دلیل انتخاب بعضی تصمیم‌ها چی بوده. برای شما هم خوبه که این دلایل رو درک کنین. مقالات خوبی هم تو این قضیه پیدا میشه.
مثلا یه مطلبی در مورد اینکه React چطور کار می‌کنه سال‌ها پیش منتشر شده از Rodrigo Pombo (امیدوارم اسمش رو درست بگم) به اسم Build your own React یا ری‌اکت خودتون رو بسازید که به صورت ویژوال بهتون توضیح میده چه طوری از صفر میشه یه ابزار مثل React رو درست کرد. هدف هم این نیست واقعا برین ری‌اکت خودتون رو بسازین، اینه که درک کنین تا دل قضیه، ری‌اکت چه طوری کار می‌کنه. با اینکه این مطلب نسخه 16 ری‌اکت رو دنبال می‌کنه ولی به نظرم همچنان ارزش خوندن رو داره. شما هم از این جور مطالب رو دنبال کنین، مطمئنا تو اون موضوع استاد تمام می‌شین.
---
یه موضوع دیگه‌ای هم که می‌خوام در موردش صحبت کنم اینه که «زبان‌ها مهم‌تر از ابزارها هستن»
  ---
فکر کنم تیتر خودش کافی باشه و دیگه بحث هم نکنیم سرش. ولی خب چاره چیه، اینجایین دیگه.
بعضی‌ها ممکنه این اشتباه رو مرتکب بشن. ممکنه یه کرش کورس واسه یه زبانی مثل JavaScript ببینین و بعد بپرن سر یه کرش کورس دیگه واسه React و بگن خسته نباشن، بسه دیگه، همه چی رو یاد گرفتیم.
واقعا؟
مشکل ساعت و طول دوره نیست، مشکل راهیه که انتخاب کردین. واقعا التماس‌تون می‌کنم، اصلا کرش کورس ری‌اکت ببینین، نوش جون‌تون. خواهشا خواهشا خواهشا JavaScript رو درست و درمون یاد بگیرین. 
نمیشه برنامه‌نویس باشین و این همه جوک در مورد جاوااسکریپت رو نشنیده باشین که درب و داغونه و یه چیزی فقط سر هم کردن.
نمیدونم از من قبول می‌کنین یا نه ولی واقعا اینجویر نیست. جاوااسکریپت مشکلات خودش رو داره (مثل هر زبون دیگه‌ای) ولی اینو از سرتون بیرون کنین که هر مشکلی شما دارین به خاطر اینه که جاوااسکریپت بد کار می‌کنه یا اساس مشکل داره. اگه Hoisting یا Coercion یا  Event Loop و بعضی موضوعات پیشرفته‌تر (یا حتی ساده‌تر) دیگه رو یاد نگیرین بعدها با یه چیزی مثل React هم مشکل پیدا می‌کنین. هر چقدر از اهمیت این قضیه بگم واقعا کمه
«شما وقتی متخصص یه فریم‌ورک می‌شین که اول متخصص اون زبان باشین» خلاص.
ممکنه شما تازه‌کار یا حتی یه برنامه‌نویس با کلی سال تجربه باشین ولی هیچوقت واسه عمیق‌تر شدن و بیشتر یاد گرفتن دیر نیست. 
کاری که من می‌کنم اینه که یه لیستی از کانسپت‌های اون زبان آماده می‌کنم و بعد در مورد هر کدوم دنبال یه مطلب خوب حالا ویدئو یا بلاگ پست می‌گردم که از یه پرسپکتیو دیگه اون موضوع رو توضیح داده باشه.
از من به شما نصیحت، یه بار رو این موضوع وقت بزارین یه عمر خودتون رو تو یادگیری هر ابزار جدیدی راحت کنین.
---
انشای امروز هم تموم شد خداروشکر. شما هم اگه راهی واسه یادگیری بلدین حتما کامنت کنین، قطعا می‌خونم و جواب میدم. 
این ویدئو هم ممکنه به نظرتون به درد بخور باشه اگه چیز دیگه تو این یوتوب برای دیدن پیدا نکردین. فعلا.`,
  fontSize: 64,
  vMargin: 0,
  hMargin: 300,
  lineSpacing: 2,
  textAlign: "center",
  speed: 1,
  direction: "ltr",
  showIndicator: true,
  scrolling: false,
  recording: false,
  showCamera: true,
  showTeleprompter: true,
  showGrid: true,
};

export const SettingsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [settings, setSettings] = useLocalStorage<SettingsValues>(
    "solo_caster_settings",
    initialValue,
  );

  const setContent = (content: string) =>
    setSettings(() => ({ ...settings, content }));
  const setFontSize = (fontSize: number) =>
    setSettings(() => ({ ...settings, fontSize }));
  const setVMargin = (vMargin: number) =>
    setSettings(() => ({ ...settings, vMargin }));
  const setHMargin = (hMargin: number) =>
    setSettings(() => ({ ...settings, hMargin }));
  const setLineSpacing = (lineSpacing: number) =>
    setSettings(() => ({ ...settings, lineSpacing }));
  const setTextAlign = (textAlign: TextAlign) =>
    setSettings(() => ({ ...settings, textAlign }));
  const setSpeed = (speed: number) =>
    setSettings(() => ({ ...settings, speed }));
  const setDirection = (direction: Direction) =>
    setSettings(() => ({ ...settings, direction }));
  const setShowIndicator = (showIndicator: boolean) =>
    setSettings(() => ({ ...settings, showIndicator }));
  const setScrolling = (scrolling: boolean) =>
    setSettings(() => ({ ...settings, scrolling }));
  const setRecording = (recording: boolean) =>
    setSettings(() => ({ ...settings, recording }));
  const setShowCamera = (showCamera: boolean) =>
    setSettings(() => ({ ...settings, showCamera }));
  const setShowGrid = (showGrid: boolean) =>
    setSettings(() => ({ ...settings, showGrid }));
  const setShowTeleprompter = (showTeleprompter: boolean) =>
    setSettings(() => ({ ...settings, showTeleprompter }));

  const reset = () => setSettings(initialValue);

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        setContent,
        setFontSize,
        setVMargin,
        setHMargin,
        setLineSpacing,
        setTextAlign,
        setSpeed,
        setDirection,
        setShowIndicator,
        setScrolling,
        setRecording,
        setShowCamera,
        setShowGrid,
        setShowTeleprompter,
        reset,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export function useSettings() {
  const data = useContext(SettingsContext);
  if (!data) throw new Error("Edit lab context data missing");
  return data;
}
