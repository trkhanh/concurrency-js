const customerActor = {
  "hungry for pie": (msg, ctx, state) => {
    return dispatchEvent(state.waiter, {
      type: "order",
      customer: ctx.self,
      wants: "pie",
    });
  },

  "put on table": (msg, ctx, _state) =>
    console.log(` ${ctx.self.name} sees " ${msg.food} " appear on the table`),
  "no pie left": (_msg, ctx, _state) =>
   console.log(` ${ctx.self.name} sulks…`),
};
