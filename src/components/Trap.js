const Trap = ({ data }) => {
    console.log(data);
    const { name, description, state, deployed } = data;
    return (
        <div className="border-2 rounded-md border-black p-2 my-2">
            <div className="flex flex-col items-start leading-tight">
                <div className="font-bold text-lg">{name}</div>
                <div>{description}</div>
            </div>

            {state === 'deployed' && (
                <div className="flex justify-between mt-2">
                    <div>
                        <span className="font-semibold">2</span> hours <span className="font-semibold">5</span> mins
                    </div>
                    <div>
                        <span className="font-semibold">11.2</span> miles
                    </div>
                </div>
            )}
        </div>
    );
};

export default Trap;
