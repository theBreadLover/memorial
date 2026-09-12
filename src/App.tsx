import Separator from "./components/Separator.tsx";
import images from "./utils/images.ts";
import Section from "./components/Section.tsx";

export default function App () {
  return (
    <>
      {/*<Header />*/}
      <main className="main">
        <article className="bg-transparent m-1 p-2">
          <section className="article-section flex flex-col flex-wrap text-center items-center">
            <h1 className="banner-title text-center text-2xl">In Memory Of</h1>
            <img className="banner-image" alt="and" src={images[1].src} />
            <p className="banner-text">
              Edwin Hernandez
              <br/>
              Who left this world on 10/17/2025.
            </p>
          </section>
          <Separator />

          <Section
            title={"Introduction"}
            image={images[3]}
            text={
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam eaque illo iure nulla numquam officia quia recusandae repudiandaesimilique voluptatibus!\n Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, rerum."}
          />
          <Separator />

          <Section
            title={"What He liked"}
            image={images[2]}
            text={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor maxime pariatur temporibus?\n Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi consequuntur maxime nobis, officia quam quidem voluptatem!"}
          />
        </article>

      </main>
    </>
  )
}
