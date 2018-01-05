import { init, getInstance, getManifest } from "d2/lib/d2";

const API_URL = "https://play.dhis2.org/demo";

class Api {
    /**
     * @param url API endpoint url
     * @param auth Authentication HTTP header content
     */
    constructor(url) {
        this.url = url;
        this.cache = [];
        this.userId = "";
        this.baseUrl = "..";
        this.ignoredStores = [""];
    }

    /**
     * Initialized the Api to a d2 instance.
     * @returns {Api}
     */
    initialize() {
        let headers =
            process.env.NODE_ENV === "development"
                ? { Authorization: "Basic YWRtaW46ZGlzdHJpY3Q=" }
                : null;
        this.d2 = getManifest("./manifest.webapp")
            .then(manifest => {
                const baseUrl =
                    process.env.NODE_ENV === "production"
                        ? manifest.getBaseUrl()
                        : this.url;
                console.info("Using URL: " + baseUrl);
                console.info(`Loading: ${manifest.name} v${manifest.version}`);
                console.info(`Built ${manifest.manifest_generated_at}`);
                this.baseUrl = baseUrl;
                return baseUrl + "/api";
            })
            .catch(e => {
                return this.url;
            })
            .then(baseUrl =>
                init({ baseUrl, headers }).then(
                    d2 => (this.userId = d2.currentUser.username)
                )
            );
        return this;
    }

    getSchema(model) {
        return getInstance().then(d2 => d2.Api.getApi().get(`schemas/${model}`));
    }

    getMetas() {
        return getInstance().then(d2 => d2.models);
    }

    getMeta(type, id) {
        return getInstance().then(d2 => d2.models[type].get(id));
    }

    getMultipleMetas(type, ids) {
        return getInstance().then(d2 => d2.Api.getApi().get(`${type}s?filter=id:in:[${ids.join(',')}]`));
    }

    getAny(type) {
        return getInstance().then(d2 => d2.models[type].list());
    }

    /**
     * Make sure the response status code is 2xx
     * @param response
     */
    successOnly(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        }
        return Promise.reject(response);
    }
}

export default (() => new Api(API_URL).initialize())();
