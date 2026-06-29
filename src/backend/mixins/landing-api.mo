import List "mo:core/List";
import Types "../types/landing";
import LandingLib "../lib/landing";

mixin (requests : List.List<Types.DemoRecord>, nextId : { var value : Nat }) {
  public query func listDemoRequests() : async [Types.DemoRecord] {
    LandingLib.listDemoRequests(requests);
  };

  public func submitDemoRequest(req : Types.DemoRequest) : async Types.DemoRecord {
    LandingLib.addDemoRequest(requests, nextId, req);
  };
};
