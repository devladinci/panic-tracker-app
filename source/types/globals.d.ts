type IScale = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type IPanicAttack = {
  id: string;
  startedAt: number;
  endedAt: number | null;
  scale: IScale | null;
  physicalSymptoms: string[] | null;
  psychologicalSymptoms: string[] | null;
  bpm: IBPM[] | null;
  location: ILocation | null;
  additionalNotes: string | null;
  userUid: string;
};

type ILocation = {
  latitude: number;
  longitude: number;
  altitude: number;
};

type IBPM = {
  value: number;
  startDate: string;
  endDate: string;
};

type ICopingTip = {
  id: string;
  tip: string;
  createdAt: number;
  upvotes: string[];
  userUid: string;
  username: string | null;
};
