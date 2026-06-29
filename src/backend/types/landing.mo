import Debug "mo:core/Debug";

module {
  public type DemoRequest = {
    name : Text;
    email : Text;
    company : Text;
    message : Text;
  };

  public type DemoRecord = {
    id : Nat;
    name : Text;
    email : Text;
    company : Text;
    message : Text;
    createdAt : Nat;
  };
};
