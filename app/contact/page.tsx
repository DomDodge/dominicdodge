// import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Heading />
      <GreenBlock />
    </div>

  );
}

function Heading() {
  return (
    <div className="heading">
      <h1>Contact</h1>
    </div>
  );
}

function GreenBlock() {
  return (
    <div>
      Hello
    </div>
  )
}