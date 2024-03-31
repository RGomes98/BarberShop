import { LogoSVG } from './LogoSVG';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='flex justify-center border-t border-border/80 px-8 pb-8'>
      <div className='flex flex-col items-center text-center'>
        <LogoSVG className='size-28' />
        <span className='mb-2'>© Todos os direitos reservados - {currentYear}</span>
        <span className='max-w-[500px] font-light'>
          Condomínio do Edifício Cecisa II - Largo Nove de Abril, Sala 214 - Vila Santa Cecília, Volta Redonda
          - RJ, 27260-180
        </span>
      </div>
    </footer>
  );
};
