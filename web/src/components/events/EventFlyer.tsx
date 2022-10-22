import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";

export default function EventFlyer() {
  return (
    <div class="w-full col center lg:flex-row lg:h-fit">
      <div class="w-full h-72 col justify-between p-2">
        <header>
          <span class="text-3xl lg:text-6xl font-condensed font-bold">
            Freedom Ball
          </span>
          <div class="row center w-full justify-between flex-wrap text-lg lg:text-2xl font-condensed">
            <span>Scottsdale Ranch Park</span>
            <div className="p-2" />
            <span>Feb 1, 2022</span>
          </div>
        </header>
        <p class="font-light leading-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet mauris
          porttitor nascetur scelerisque ornare neque semper quis etiam.
        </p>
        <div class="row center flex-wrap w-full justify-between">
          <SecondaryButton>More Info</SecondaryButton>
          <PrimaryButton>Register</PrimaryButton>
        </div>
      </div>
      <div class="w-full h-full">
        <img class="h-full w-full object-cover" src="/volleyball.png" />
      </div>
    </div>
  );
}
