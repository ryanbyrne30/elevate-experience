import PrimaryButton from "@/components/buttons/PrimaryButton";

export default function AdminEventCreatePage() {
  return (
    <form className="w-full max-w-lg p-8">
      <h1>Create New Event</h1>
      <div className="group">
        <label className="required">Name</label>
        <input type="text" placeholder="My Awesome Event" required />
      </div>
      <div className="group">
        <label className="required">Date</label>
        <input type="datetime-local" required />
      </div>
      <div className="group">
        <label>Location</label>
        <input type="text" placeholder="Neptune State Park" />
      </div>
      <div className="group">
        <label>Description</label>
        <textarea placeholder="Doubles tournament..." />
      </div>
      <div className="py-10">
        <PrimaryButton>Create Event</PrimaryButton>
      </div>
    </form>
  );
}
