import TemplateRepository from "./TemplateRepository";

class ProviderService extends TemplateRepository{
    constructor(){
        super('/provider');
    }

    getProvider()
    {
        return JSON.parse(localStorage.getItem('provider'));
    }
    setProvider(provider)
    {
        localStorage.setItem('provider',JSON.stringify(provider));
    }
}
export default new ProviderService();