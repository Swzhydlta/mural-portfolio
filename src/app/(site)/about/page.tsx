const education = [
  {
    year: "2013",
    entry: (
      <>
        Honors Fine Art, <span className="text-[#0000ff]">Makhanda</span>
      </>
    ),
  },
  {
    year: "2008",
    entry: "Matric, Roseway Waldorf.",
  },
];

const soloShows = [
  {
    year: "2018",
    entry: (
      <>
        <span className="text-[#ff0000]">Once Removed</span>, SMITH, Cape Town.
      </>
    ),
  },
  {
    year: "2017",
    entry: "Spell of Another, 99Loop, Cape Town",
  },
  {
    year: "2015",
    entry: "Glass, Durban",
  },
];


const awards = [
  {
    year: "2024",
    entry: "Book Cover for Once Removed by David Mann",
  },
  {
    year: "2017",
    entry: "Residency, Johannesburg",
  },
  {
    year: "2016",
    entry: (
      <>
        Residency, <span className="text-[#ffff00]">Berlin</span>
      </>
    ),
  },
  {
    year: "2015",
    entry: (
      <>
        <span className="text-[#0000ff]">Arctic Circle</span> Residency Nominee
      </>
    ),
  },
  {
    year: "2013",
    entry: "Residency, Villanella Studios, Antwerp",
  },
];
// <span className="text-[#ffff00]"></span> yellow
// <span className="text-[#ff0000]"></span> red
// <span className="text-[#0000ff]"></span> blue

export default function AboutPage() {
  return (
    <main className="max-w-2xl text-left text-sm leading-none px-4 py-6 flex flex-col gap-8">
      <section>
        <h1 className="mb-2">ABOUT</h1>
        <p className="mb-4">
          I was introduced to painting and drawing in my teenage years <span className="text-[#ff0000]">through</span>
          {" "}grafitti. From there
          I began to make street art and murals, and also started a tshirt label with my brother. 
          While studying fine art my practice shifted <span className="text-[#ffff00]">toward</span> oil paint on canvas. After graduating, I
          continued working in the same vein as while at university. I held two solo shows in Cape Town.  
          I also made some music <span className="text-[#0000ff]">and</span> colaborated with friends on music videos and in other artistic contexts.
        </p>
        <p>
          During covid I developed <span className="text-[#0000ff]">an</span> interest in programming, which led to a career switch. I have now 
          been a professional software engineer for the last five years or so. During this time I 
          have continued to make paintings on and off. 
        </p>
      </section>

      <section>
        <h2 className="mb-2">EDUCATION</h2>
        <ul className="flex flex-col gap-0">
          {education.map((item) => (
            <li key={item.year} className="flex gap-4">
              <span className="w-24 shrink-0 whitespace-nowrap">{item.year}</span>
              <span>{item.entry}</span>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="mb-2">SOLO SHOWS</h2>
        <ul className="flex flex-col gap-0">
          {soloShows.map((item) => (
            <li key={item.year} className="flex gap-4">
              <span className="w-24 shrink-0 whitespace-nowrap">{item.year}</span>
              <span>{item.entry}</span>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="mb-2">AWARDS/RESIDENCIES/OTHER</h2>
        <ul className="flex flex-col gap-0">
          {awards.map((item) => (
            <li key={item.year} className="flex gap-4">
              <span className="w-24 shrink-0 whitespace-nowrap">{item.year}</span>
              <span>{item.entry}</span>
            </li>
          ))}
        </ul>
      </section>
      
    </main>
  );
}
