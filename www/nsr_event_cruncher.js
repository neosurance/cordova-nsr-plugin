var nsr_event_cruncher = {

    ns_lang: new URL(document.URL).searchParams.get('ns_lang'),

    ns_log: (new URL(document.URL).searchParams.get('ns_log') == 'true'),

    NSRPostMsg: function (params) {

        //>>> NSR: NSREventWebView eventWebView (name)

        try {
            if (typeof window.webkit != "undefined" && window.webkit != null)
                window.webkit.messageHandlers.app.postMessage(params);
            else
                Neosurance.NSR_PostMessage(JSON.stringify(params));
        } catch (err) {
            Neosurance.NSR_PostMessage(JSON.stringify(params));
        }
    },

    NSRlog: function (msg) {
        if (nsr_event_cruncher.ns_log) {
            console.log('nsr_event_cruncher.EVC>> ' + msg);
            nsr_event_cruncher.NSRPostMsg({
                log: 'nsr_event_cruncher.EVC>> ' + msg
            });
        }
    },

    EVC: {


        init: function () {
            if (localStorage.getItem("nsr_chains") != null)
                window.eval(localStorage.getItem("nsr_chains"));
            nsr_event_cruncher.EVC.synch();
        },
        synch: function () {

            nsr_event_cruncher.NSRlog('eventView Synch!');

            var t = localStorage.getItem("nsr_chainstime");
            t = t == null ? 0 : parseInt(t, 10);

            nsr_event_cruncher.NSRPostMsg({
                what: 'callApi',
                endpoint: 'chains?t=' + t,
                callBack: 'nsr_event_cruncher.EVC.innerSynch'
            });

        },
        innerSynch: function (res) {

            nsr_event_cruncher.NSRlog('eventView innerSynch! ' + JSON.stringify(res));

            if (res.status == 'ok') {
                nsr_event_cruncher.NSRlog('refresh chains!');
                localStorage.setItem("nsr_chainstime", res.chains_time);
                localStorage.setItem("nsr_chains", res.chains);
                window.eval(res.chains);
            }

        },

        n_pending_evt: 0,

        innerCrunchEvent: function (nsrEvent) {

            nsr_event_cruncher.NSRlog('innerCrunchEvent');

            if (window.crunchEvent) {

                nsr_event_cruncher.NSRlog('cruncher exists');
                window.crunchEvent(nsrEvent);
                nsr_event_cruncher.EVC.n_pending_evt = 0;

            } else if (nsr_event_cruncher.EVC.n_pending_evt++ < 10) {

                nsr_event_cruncher.NSRlog('wait for cruncher ' + nsr_event_cruncher.EVC.n_pending_evt);

                setTimeout(function () {
                    nsr_event_cruncher.EVC.innerCrunchEvent(JSON.parse(JSON.stringify(nsrEvent)))
                }, 1000);
            }

        },

        loaded: function () {

            nsr_event_cruncher.NSRlog('continueInitJob');
            nsr_event_cruncher.NSRPostMsg({
                what: 'continueInitJob'
            });
        }

    }

};



//EVC.init();

module.exports = nsr_event_cruncher;
