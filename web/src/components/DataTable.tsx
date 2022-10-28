import { Dispatch, useState } from "react";
import Modal from "./Modal";
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton";
import { SetStateAction } from "jotai";

type Entry = {
  id: number | string;
  key: string;
  value: string | number;
};

function CellModal({
  entry,
  setEntry,
  onUpdate,
}: {
  entry?: Entry;
  setEntry: Dispatch<SetStateAction<Entry | undefined>>;
  onUpdate: (id: number | string, key: string, value: string | number) => void;
}) {
  return (
    <Modal isOpen={!!entry}>
      <div className="col center h-screen w-screen justify-center backdrop-blur-md backdrop-brightness-75">
        <form className="group w-fit max-w-sm rounded bg-primary p-8">
          <div className="group">
            <label>{entry?.key}</label>
            <input defaultValue={entry?.value} />
          </div>
          <div className="group">
            <PrimaryButton
              className="my-4"
              onClick={() => {
                if (!!entry) onUpdate(entry.id, entry.key, entry.value);
              }}
            >
              Save
            </PrimaryButton>
            <SecondaryButton onClick={() => setEntry(undefined)}>
              Cancel
            </SecondaryButton>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default function DataTable({
  data,
  onUpdate,
}: {
  data: (Record<string, any> & { id: number | string })[];
  onUpdate: (id: number | string, key: string, value: string | number) => void;
}) {
  const [entry, setEntry] = useState<Entry | undefined>(undefined);

  const firstEl = data[0];
  const keys = firstEl === undefined ? [] : Object.keys(firstEl);
  if (data.length === 0 || firstEl === undefined) return null;

  return (
    <>
      <div className="col relative h-fit max-h-96 w-screen items-start overflow-scroll p-4">
        <table>
          <tbody className="relative">
            <tr className="sticky top-0 left-0 w-full">
              {keys.map((k) => (
                <th key={k}>{k}</th>
              ))}
            </tr>
            {data.map((el, idx) => (
              <tr key={idx}>
                {keys.map((k) => (
                  <td
                    key={k}
                    className="cursor-pointer"
                    onClick={() =>
                      setEntry({ id: el.id, key: k, value: el[k] })
                    }
                  >
                    {el[k].toString()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CellModal entry={entry} setEntry={setEntry} onUpdate={onUpdate} />
    </>
  );
}
