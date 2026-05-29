import dotDes from './assets/dot_des.png';
import dotEn from './assets/dot_en.png';

export function BurningDot() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 -top-3 w-7 h-7 pointer-events-none">
      <img src={dotDes} alt="" className="absolute inset-0 w-full h-full object-contain" />
      <img src={dotEn} alt="" className="absolute inset-0 w-full h-full object-contain" />
    </div>
  );
}

