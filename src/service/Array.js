import _ from 'lodash';

class Array
{
    control(array, value)
    {
        let found = _.find(array, (item)=> { return item === value });

        if(found !== null && found !== undefined)
        {
            array = _.pull(array, value);
        }
        else
        {
            array.push(value);
        }

        return array;
    };

    controlObject(array, value)
    {
        let found = _.find(array, (item)=> { return item._id === value._id });

        if(found !== null && found !== undefined)
        {
            //Make nothing
        }
        else
        {
            array.push(value);
        }

        return array;
    };
}

export default Array;