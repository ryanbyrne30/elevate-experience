export default function EventPodium() {
  return (
    <div
      class="grid grid-rows-3 gap-2"
      style={{ gridTemplateRows: "auto auto auto" }}
    >
      <div class="col items-start">
        <div class="col center w-full p-2">
          <span class="font-light opacity-60">First Place</span>
          <span class="text-xl">Werewolves</span>
        </div>
        <div class="aspect-square">
          <img class="w-full h-full object-cover" src="/lily.jpeg" />
        </div>
      </div>

      <div class="row center">
        <div class="aspect-square w-1/3">
          <img class="w-full h-full object-cover" src="/lily.jpeg" />
        </div>
        <div class="p-2 col">
          <span class="text-sm font-light opacity-60">Second Place</span>
          <span class="text-lg">Wolves</span>
        </div>
      </div>

      <div class="row center">
        <div class="aspect-square w-1/3">
          <img class="w-full h-full object-cover" src="/lily.jpeg" />
        </div>
        <div class="p-2 col">
          <span class="text-sm font-light opacity-60">Third Place</span>
          <span class="text-lg">Hounds</span>
        </div>
      </div>
    </div>
  );
}
