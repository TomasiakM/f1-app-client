export default (errors: { [key:string]: string}, name?: string) => {
    const err = ref([] as { 
        index: number;
        errors: {
            [key: string]: string;
        }
    }[]);

    for(const el in errors){
        if(name && !el.startsWith(name)){
            continue;
        }

        const splited = el.split('.');
        
        splited.forEach((e, i) => {
            const matches = e.match(/\[(.*?)\]/);
            if(matches){
                const find = err.value.find(e => e.index === Number(matches[1]))
                if(!find){
                    const d = splited.splice(i + 1).join('.');
                    err.value.push({
                        index: Number(matches[1]),
                        errors: {
                            [d]: errors[el],
                        }
                    })
                } else {
                    const d = splited.splice(i + 1).join('.');
                    find.errors = {
                        ...find.errors,
                        [d]: errors[el]
                    };
                }
            }
        })
    }

    const val = err.value.reduce((prev, e) =>{
        for(const name in e.errors){
            prev[e.index] = { ...prev[e.index], [name]: e.errors[name] }
        }

        return prev;
    }, [] as { [key: string]: string }[])


    return { errors: val }
}