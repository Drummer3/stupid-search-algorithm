import { useQuery } from "@tanstack/react-query";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { getCategories } from "./api/categories";
import { getEveryMatchPath } from "./utils/get-instances-in-tree";
import { existsInTree } from "./utils/exists-in-tree";

function App() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [filtered, setFiltered] = useState<unknown[]>([]);
  const [instances, setInstances] = useState<string[]>([]);

  const query = useQuery({ queryKey: ["categories"], queryFn: getCategories });

  const formSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const searchValue = searchRef?.current?.value || "";
    const filteredCategories = existsInTree(query.data!.data, searchValue);
    const allInstances = getEveryMatchPath(query.data!.data, searchValue);
    // console.log(allInstances);
    setFiltered(filteredCategories);
    setInstances(allInstances);
  };

  useEffect(() => {
    setFiltered(query.data?.data || []);
  }, [query.data?.data]);

  return (
    <div className="space-y-8">
      <div className="hero">
        <div className="hero-content text-center">
          <h1 className="text-5xl font-bold">Category filter</h1>
        </div>
      </div>
      <form onSubmit={formSubmitHandler} className="flex items-center gap-2">
        <label className="input input-bordered input-primary w-full flex items-center gap-2">
          Search: <input type="text" className="grow" ref={searchRef} />
        </label>

        <button className="btn btn-primary" role="submit">
          Search
        </button>
      </form>
      <div className="hero">
        <div className="hero-content text-center">
          <h1 className="text-3xl font-bold">
            Result{instances.length ? ` (${instances.length} instances)` : ""}:
          </h1>
        </div>
      </div>
      <div className="flex gap-4 flex-wrap">
        {filtered.length
          ? filtered.map((item) => (
              <div key={item.id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{item.title}</h2>
                  {/* <div className="card-actions justify-end"> */}
                  {/*   <button className="btn btn-primary">Buy Now</button> */}
                  {/* </div> */}
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
  // return <pre>{JSON.stringify(rawCategories, null, 2)}</pre>;
}

export default App;
