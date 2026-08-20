const u=(id,w=1400)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=72`;

const v=(id,alt)=>({src:u(id),alt});

// Distinct top-level page imagery so the same default hero is not repeated site-wide.
export const pageVisuals={
  home:v('photo-1778731525489-439d0dff9e31','Modern fitted kitchen with gas range and overhead chimney hood'),
  about:v('photo-1765518440022-10242cc86895','Technician tool belt representing professional doorstep appliance service'),
  services:v('photo-1635805771545-c5d19dde76d6','Organised repair tools used for appliance servicing and maintenance'),
  serviceAreas:v('photo-1756471818388-af6aadafbf07','Modern residential kitchen representing local doorstep service coverage'),
  guides:v('photo-1725483990188-41d4fb0d1e5a','Kitchen cooking setup representing practical appliance care guidance'),
  faq:v('photo-1722942722319-5e2edafa6e3b','Close-up of cooking appliance controls and knobs'),
  contact:v('photo-1773579223066-4b54a17ec8cc','Bright residential kitchen representing doorstep service booking'),
};

// Kept for compatibility with PageHero's existing default prop.
export const visuals={
  kitchen:pageVisuals.home.src,
};

// Each service has separate imagery for the home card (where shown), services card,
// service hero and service-detail content so one photo is not recycled in multiple slots.
export const serviceVisuals={
  'gas-stove-repair':{
    homeCard:v('photo-1739598752069-6806ce5d762a','Blue gas flame on a stove burner'),
    card:v('photo-1767771665869-51fab4d8c83b','Close-up of a gas stove burner with a steady blue flame'),
    hero:v('photo-1773867567732-556eb4351fd7','Modern stainless-steel gas range in a fitted kitchen'),
    detail:v('photo-1584677191047-38f48d0db64e','Hand tools used for gas stove inspection and repair'),
  },
  'hob-repair':{
    homeCard:v('photo-1777823703825-52c932765ac8','Lit gas hob burner viewed close up'),
    card:v('photo-1723902500132-7de6112d5627','Close-up of a multi-burner gas hob and its controls'),
    hero:v('photo-1772567732877-651f16e6e335','Premium gas cooktop controls and burner surface'),
    detail:v('photo-1756931014360-c172ac8b38f9','Repair tools carried for appliance inspection and servicing'),
  },
  'chimney-service':{
    homeCard:v('photo-1714358013380-b75b16127007','Stainless-steel kitchen chimney above a cooktop'),
    card:v('photo-1642979430180-e676c2235ce2','Modern glass kitchen chimney and extraction hood'),
    hero:v('photo-1756737042708-e8864961f93e','Stainless-steel range hood representing chimney service'),
    detail:v('photo-1748284520450-fb6cb1afa322','Large metal kitchen extraction duct and chimney fitting'),
  },
  'gas-cleaning':{
    homeCard:v('flagged/photo-1585755044460-daac4171e511','Gas cooking range in a residential kitchen ready for routine cleaning'),
    card:v('photo-1768742893654-7afa6649f01d','Used gas stove area representing cleaning and maintenance needs'),
    hero:v('photo-1620056266952-05de992d2cbb','Gas range and cooking surface in a clean fitted kitchen'),
    detail:v('photo-1581578731548-c64695cc6952','Professional cleaning work representing appliance cleaning service'),
  },
  'cooking-range-service':{
    homeCard:v('photo-1776313756994-d9e9ab7b2d5c','Stainless-steel cooking range with multiple gas burners'),
    card:v('photo-1560562125-ab512e4d9d29','Freestanding gas cooking range in a modern kitchen'),
    hero:v('photo-1770063817031-f3b98dff347f','Modern kitchen equipped with a full cooking range'),
    detail:v('photo-1630699033581-0fa398e5829a','Kitchen cooking appliance setup representing range servicing'),
  },
  'gas-pipeline-installation':{
    homeCard:v('photo-1529836349180-223cd77d8cb6','Pipe wrench and plumbing tools used for secure gas-line fitting'),
    card:v('photo-1686893038485-9881e02e0d52','Fixed metal pipe installation representing routed gas piping'),
    hero:v('photo-1649756173672-d2a4c9d2920c','Industrial wrench and metal fittings used for pipeline work'),
    detail:v('photo-1774645215883-14d1553f3fa0','Organised spanner set used for connection and fitting work'),
  },
  'gas-leakage-inspection':{
    card:v('photo-1764488276152-8a16f1f85837','Technician inspecting a gas flame and cooking equipment'),
    hero:v('photo-1777823703795-050c8384cdae','Gas burner flame representing combustion and leakage inspection'),
    detail:v('photo-1764677367365-d56787922d83','Gas burner operating beneath cookware during appliance checking'),
  },
  'gas-regulator-repair':{
    card:v('photo-1762599836341-efcb3c0acb98','Close-up of a gas container valve and connection point'),
    hero:v('photo-1759044271138-6d2c871dd8ef','Rows of LPG cylinders representing regulated gas supply'),
    detail:v('photo-1574377250314-360968d9d54a','Gas stove top representing regulator and supply-side appliance checks'),
  },
  'ignition-repair':{
    card:v('photo-1763054764314-775e96be7ee7','Gas burner in use representing ignition performance'),
    hero:v('photo-1745466041219-87f6dac81d09','Gas cooking station representing burner and ignition servicing'),
    detail:v('photo-1743612828221-7bdc71a8107a','Portable gas stove with visible controls for ignition inspection'),
  },
  'lpg-appliance-repair':{
    card:v('photo-1763203010726-82d8546d62b6','Traditional kitchen with a gas cooking range'),
    hero:v('photo-1623114112815-74a4b9fe505d','Gas range and hood representing LPG kitchen appliance service'),
    detail:v('photo-1771613413936-3d8db8b9108b','Residential gas stove and kitchen hood setup'),
  },
  'commercial-kitchen-service':{
    card:v('photo-1782750161991-23529c9462bb','Stainless-steel commercial kitchen equipment and cooking line'),
    hero:v('photo-1771360963016-1408c2de12c4','Commercial cook working at a large gas cooking range'),
    detail:v('photo-1776267074160-f8a3ff92b08e','Commercial kitchen maintenance and cleaning environment'),
  },
  'annual-maintenance':{
    card:v('photo-1771013151504-10519ebdb8cd','Pan cooking over a gas flame representing routine appliance use'),
    hero:v('photo-1617228069096-4638a7ffc906','Well-maintained modern kitchen with gas cooking appliances'),
    detail:v('photo-1505798577917-a65157d3320a','Home maintenance tools representing scheduled appliance upkeep'),
  },
  'kitchen-appliance-service':{
    card:v('photo-1779314687592-7d64bea77e8a','Bright modern kitchen with integrated cooking appliances'),
    hero:v('photo-1760072513457-651955c7074d','Contemporary kitchen with cooking and extraction appliances'),
    detail:v('photo-1770135878277-73e589248b43','Wide modern kitchen representing multi-appliance service support'),
  },
};

export const guideVisuals={
  'gas-stove-safety-guide':{
    card:v('photo-1551218808-94e220e084d2','Kitchen cooking environment representing safe gas stove use'),
    hero:v('photo-1771371282665-545256b20dca','Bright kitchen with gas range and ventilation hood for stove safety guidance'),
  },
  'gas-stove-cleaning-maintenance':{
    card:v('photo-1556911220-bff31c812dba','Kitchen appliance area representing routine cleaning and maintenance'),
    hero:v('photo-1556910103-1c02745aae4d','Active kitchen environment representing regular stove care'),
  },
  'hob-troubleshooting-guide':{
    card:v('photo-1629042306650-62a83c847b15','Cooktop and range hood setup representing hob troubleshooting'),
    hero:v('photo-1529692236671-f1f6cf9683ba','Cooking setup representing practical hob checks and troubleshooting'),
  },
  'chimney-maintenance-guide':{
    card:v('photo-1618850771908-a9d895a51c0d','Kitchen stove area representing routine chimney maintenance'),
    hero:v('photo-1553623034-6abda0c2b7b0','Large extraction hood and duct representing ventilation maintenance'),
  },
};
