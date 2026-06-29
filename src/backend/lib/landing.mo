import List "mo:core/List";
import Types "../types/landing";

module {
  public func listDemoRequests(requests : List.List<Types.DemoRecord>) : [Types.DemoRecord] {
    requests.toArray();
  };

  public func addDemoRequest(
    requests : List.List<Types.DemoRecord>,
    nextId : { var value : Nat },
    req : Types.DemoRequest,
  ) : Types.DemoRecord {
    let record : Types.DemoRecord = {
      id = nextId.value;
      name = req.name;
      email = req.email;
      company = req.company;
      message = req.message;
      createdAt = 0;
    };
    nextId.value += 1;
    requests.add(record);
    record;
  };
};
