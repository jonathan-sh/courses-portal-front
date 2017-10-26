import TemplateRepository from "./TemplateRepository";

class ProviderRepository extends TemplateRepository{
    constructor(){
        super('/provider');
    }
}
export default ProviderRepository;