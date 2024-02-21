import HappyDumplingKarta from '../graphics/HappyDumplingKarta.png';

export const Contact = () => {
  return (
    <>


      <h3>Öppettider</h3>
      <p>Måndag - Fredag: 11:00 - 22:00</p>
      <p>Lördag - Söndag: 12:00 - 22:00</p>

      <br />
      
      <p className='font-bold'>Happy Dumpling</p>
      <p>Malmögatan 8</p>
      <p>54321 Malmö</p>
      <p>Telefon: 040-345 67 89</p>
      <p>Email: <a href="mailto:happy@dumpling.se">happy@dumpling.se</a></p>
      

      <div>
        <img src={HappyDumplingKarta} alt="Map" className=" min-h-80 m-4" />
      </div>
    </>
  );};

