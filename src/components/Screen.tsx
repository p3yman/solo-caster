import { Teleprompter } from "./Telepromter";

export const Screen = () => {
  return (
    <div className="aspect-video w-screen border border-white bg-black text-white">
      <Teleprompter />
    </div>
  );
};
