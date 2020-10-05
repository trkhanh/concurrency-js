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
  "no pie left": (_msg, ctx, _state) => console.log(` ${ctx.self.name} sulks…`),
};

const waiterActor = {
  order: (msg, ctx, state) => {
    if (msg.wants == "pie") {
      dispatch(state.pieCase, {
        type: "get slice",
        customer: msg.customer,
        waiter: ctx.self,
      });
    } else {
      console.dir(`Don't know how to order ${msg.wants} `);
    }
  },
  "add to order": (msg, ctx) =>
    console.log(
      `Waiter adds ${msg.food} to ${msg.customer.name} ${msg.customer.name} 's order`
    ),
  error: (msg, ctx) => {
    dispatch(msg.customer, { type: "no pie left", msg: msg.msg });
    console.log(
      `\nThe waiter apologizes to ${msg.customer.name} : ${msg.msg} `
    );
  },
};

const pieCaseActor = {
  "get slice": (msg, context, state) => {
    if (state.slices.length == 0) {
      dispatch(msg.waiter, {
        type: "error",
        msg: "no pie left",
        customer: msg.customer,
      });
      return state;
    } else {
      var slice = state.slices.shift() + " pie slice";
      dispatch(msg.customer, { type: "put on table", food: slice });
      dispatch(msg.waiter, {
        type: "add to order",
        food: slice,
        customer: msg.customer,
      });
      return state;
    }
  },
};
