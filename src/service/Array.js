class Array
{
    add(array, value)
    {
        array.push(value);
        return array;
    };

    remove(array, value)
    {
        let position, a = arguments, L = a.length;
        while (L && array.length) {
            position = a[--L];
            if(array.indexOf(position) !== -1){
                array.splice(array.indexOf(position), 1);
            }
        }
        return array;
    };

    control(array, value)
    {
        let noExist = true;

        for(let i = 0; i <= array.length; i++)
        {
            if(array[i] === value)
            {
                array = this.remove(array, value);
                break;
            }
            else if(array[i] === array[array.length] && noExist === true)
            {
                array = this.add(array, value);
                noExist = false;
            }
        }
        return array;
    };
}

export default Array;