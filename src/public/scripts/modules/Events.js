class Events {
    /**
     * Create new events object
     */
    constructor() {
        this.triggers = {};
    }

    /**
     * Runs callback on event trigger
     * @param {String} event Name of event
     * @param {Function} callback Callback function to run
     */
    on(event, callback) {
        const triggers = this.triggers;

        if (!triggers[event]) {
            if (!triggers[event]) triggers[event] = []
            triggers[event].push({ callback: callback, type: "on" });
        }
    }

    /**
     * Runs callback on event trigger (only once)
     * @param {String} event Name of event
     * @param {Function} callback Callback function to run
     */
    once(event, callback) {
        const triggers = this.triggers;

        if (!triggers[event]) {
            if (!triggers[event]) triggers[event] = []
            triggers[event].push({ callback: callback, type: "once" });
        }
    }

    /**
     * Trigger event callbacks
     * @param {String} event Name of event
     * @param {{}} params Parameters to pass to callback functions 
     */
    trigger(event, params) {
        const triggers = this.triggers;

        if (triggers[event]) {
            for (let i in triggers[event]) {
                triggers[event][i]["callback"](params);

                if (triggers[event][i]["type"] == "once") {
                    delete triggers[event][i];
                }
            }
        }
    }
}

export { Events };