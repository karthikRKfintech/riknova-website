import List "mo:core/List";
import MixinViews "mo:caffeineai-data-viewer/MixinViews";
import Types "types/landing";
import LandingMixin "mixins/landing-api";

actor {
  include MixinViews();

  stable var demoRequests : List.List<Types.DemoRecord>;
  stable var nextDemoId : { var value : Nat };

  include LandingMixin(demoRequests, nextDemoId);
};
