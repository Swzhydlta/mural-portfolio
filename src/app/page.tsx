export default function Home() {
  return (
    <div>
      <header></header>
      <nav className="w-full flex items-center justify-between p-4 ">
        <div> Daniel Mark Nel</div>
        <div className="space-x-4">
          <a href="/" className="hover:underline">
            contact
          </a>
        </div>
      </nav>
      <main>
        <div className="flex flex-col w-full items-center">
          <img src="seapoint.jpg" alt="seapoint" />
          <img src="aspen.jpg" alt="aspen" />
          <img src="bridge.jpg" alt="bridge" />
          <img src="caydon.jpg" alt="caydon" />
          <img src="DSC_0095.jpg" alt="DSC_0095" />
          <img src="field.jpg" alt="field" />
          <img src="lemons.jpg" alt="lemons" />
          <img src="nicci.jpg" alt="nicci" />
          <img src="river.jpg" alt="river" />

          <img src="steps.jpg" alt="steps" />
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
