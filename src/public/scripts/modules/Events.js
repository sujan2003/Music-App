class Events {
    constructor() {
        this.triggers = {};
    }

    on(event, callback) {
        const triggers = this.triggers;

        if (!triggers[event]) {
            if (!triggers[event]) triggers[event] = []
            triggers[event].push(callback);
        }
    }

    trigger(event, params) {
        const triggers = this.triggers;

        if (triggers[event]) {
            for (let i in triggers[event]) {
                triggers[event][i](params);
            }
        }
    }
}

export { Events };