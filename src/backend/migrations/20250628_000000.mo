import List "mo:core/List";

module {
  type OldActor = {};

  type NewActor = {
    demoRequests : List.List<{ id : Nat; name : Text; email : Text; company : Text; message : Text; createdAt : Nat }>;
    nextDemoId : { var value : Nat };
  };

  public func migration(_old : OldActor) : NewActor {
    {
      demoRequests = List.empty<{ id : Nat; name : Text; email : Text; company : Text; message : Text; createdAt : Nat }>();
      nextDemoId = { var value = 0 };
    };
  };
};
