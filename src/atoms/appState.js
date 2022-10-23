import { atom, selector } from "recoil";

export const linkFilterState = atom({
  key: "linkFilter",
  default: "all",
});

export const linkDataState = atom({
  key: "linkData",
  default: null,
});

export const filteredLinkState = selector({
  key: "filteredLinks",
  get: ({ get }) => {
    const list = get(linkDataState);
    const filter = get(linkFilterState);

    switch (filter) {
      case "all":
        return list?.results;
      case "active":
        return list?.results?.filter(i => i?.is_active === true);
      case "inactive":
        return list?.results?.filter(i => i?.is_active === false);
      default:
        return list?.results?.filter(i => i?.asset?.short_name === filter);
    }
  },
});

export const txnFilterState = atom({
  key: "txnFilter",
  default: "all",
});

export const txnDataState = atom({
  key: "txnData",
  default: null,
});

export const filteredTxnState = selector({
  key: "filteredTxns",
  get: ({ get }) => {
    const list = get(txnDataState);
    const filter = get(txnFilterState);

    switch (filter) {
      case "all":
        return list?.results;
      case "successful":
      case "pending":
      case "failed":
        return list?.results?.filter(
          i => i?.status === (filter === "successful" ? "success" : filter)
        );
      default:
        return list?.results?.filter(i => i?.asset?.short_name === filter);
    }
  },
});
