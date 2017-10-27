import TemplateRepository from "./TemplateRepository";

class ProviderService extends TemplateRepository{
    constructor(){
        super('/provider');
    }
}
export default new ProviderService();