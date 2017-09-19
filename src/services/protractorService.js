const protractor_service_url = 'http://localhost:5000/api';

const headers = new Headers({
    "Content-Type": "application/json",
    "Accept": "application/json"
});

export const ProtractorService = {
    getActions: function () {
        return fetch(protractor_service_url + '/basic/action').then(res => {
            return res.json();
        }).catch(err => {
            console.log(err);
        });
    },

    getLocators: function () {
        return fetch(protractor_service_url + '/basic/locator').then(res => {
            return res.json();
        }).catch(err => {
            console.log(err);
        });
    },

    getSuites: async function () {
        try {
            let res = await fetch(protractor_service_url + '/suites');
            return await res.json();
        } catch (err) {
            console.log(err);
        }
    },

    getSuite: async (id) => {
        try {
            let res = await fetch(protractor_service_url + '/suites/' + id);
            return await res.json();
        } catch (err) {
            console.log(err);
        }
    },

    putSuite: async (testSuite) => {
        try {
            let request = new Request(protractor_service_url + '/suites', {
                headers: headers,
                method: 'PUT',
                body: JSON.stringify(testSuite)
            });

            let res = await fetch(request);
            return await res.json();
        } catch (err) {
            console.log(err);
        }
    },

    getCases: function () {
        return fetch(protractor_service_url + '/cases').then(res => {
            return res.json();
        }).catch(err => {
            console.log(err);
        });
    },

    getCase: function (id) {
        return fetch(protractor_service_url + '/cases/' + id).then(res => {
            return res.json();
        }).catch(err => {
            console.log(err);
        });
    },

    putCase: async (testCase) => {
        let request = new Request(protractor_service_url + '/cases', {
            headers: headers,
            method: 'PUT',
            body: JSON.stringify(testCase)
        });

        try {
            let res = await fetch(request);
            return await res.json();
        } catch (err) {
            console.log(err);
        }
    },

    run: async (headerless) => {
        let request = new Request(protractor_service_url + '/protractor', {
            headers: headers,
            method: 'POST',
            body: headerless
        });

        try {
            let res = await fetch(request);
            return await res.json();
        } catch (err) {
            console.log(err);
        }
    }
};