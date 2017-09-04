const protractor_service_url = 'http://localhost:50211/api';

export const ProtractorService = {
    getActions: function () {
        return fetch(protractor_service_url + '/basic/action', { mode: 'no-cors' }).then(res => {
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
            let res = await fetch(protractor_service_url + '/suites', { mode: 'no-cors' });
            let resJson = await res.json();
            if (resJson) {
                return resJson;
            } else {
                return [];
            }
        } catch (err) {
            console.log(err);
        }
    },

    getSuite: function (id) {
        return fetch(protractor_service_url + '/suites/' + id).then(res => {
            return res.json();
        }).catch(err => {
            console.log(err);
        });
    },

    postSuite: function (testSuite) {
        return fetch(protractor_service_url + '/suites', {
            method: 'POST',
            body: testSuite
        }).then(res => {
            return res.json();
        }).catch(err => {
            console.log(err);
        });
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

    postCase: function (testCase) {
        return fetch(protractor_service_url + '/cases', {
            method: 'POST',
            body: testCase
        }).then(res => {
            return res;
        }).catch(err => {
            console.log(err);
        });
    }
};