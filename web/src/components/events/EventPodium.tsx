export default function EventPodium() {
  return (
    <div class="col">
      <div class="row my-1 center bg-gradient-to-r from-amber-500">
        <div class="aspect-square w-1/2">
          <img class="w-full h-full object-cover" src="/lily.jpeg" />
        </div>
        <div class="col p-2">
          <span class="font-light opacity-60">First Place</span>
          <span class="text-xl">Werewolves</span>
        </div>
      </div>

      <div class="row my-1 center bg-gradient-to-r from-zinc-500">
        <div class="aspect-square w-2/5">
          <img class="w-full h-full object-cover" src="/lily.jpeg" />
        </div>
        <div class="p-2 col">
          <span class="text-sm font-light opacity-60">Second Place</span>
          <span class="text-lg">Wolves</span>
        </div>
      </div>

      <div class="row my-1 center bg-gradient-to-r from-orange-800">
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
