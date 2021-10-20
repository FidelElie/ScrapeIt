// ! Library
import { ApplicationState } from "../../../lib/app";

export default function OrganiseStage() {
    const { stage } = ApplicationState();

    return (
        <>
        <div className="container max-w-3xl mt-5 p-4">
            <div className="rounded-md bg-white px-5 py-3 text-gray-500 flex justify-between items-center">
            <span className="tracking-tight">
                Stage 4: Sort And Export Your Data
            </span>
            <i className="far fa-question-circle text-xl"></i>
            </div>
        </div>
        <div className="container h-3/4 max-w-5xl p-4">
        </div>
        </>
    )
}
