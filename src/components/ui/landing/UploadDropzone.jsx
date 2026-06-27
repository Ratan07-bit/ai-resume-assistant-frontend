import { UploadCloud } from "lucide-react"

function UploadDropzone({ file, setFile }) {
    return (
        <label
            className="
            flex
            flex-col
            items-center
            justify-center
            w-full
            h-56
            border-2
            border-dashed
            rounded-xl
            cursor-pointer
            hover:border-black
            hover:bg-gray-50
            transition
            duration-300
            "
        >
            <UploadCloud
                size={60}
                className="text-gray-400"
            />

            <h3 className="text-xl font-semibold mt-4">
                Drag & Drop Resume
            </h3>

            <p className="text-gray-500 mt-2">
                or click to browse
            </p>

            <p className="text-sm text-gray-400 mt-2">
                PDF only • Max 5MB
            </p>

            {file && (
                <div className="mt-5 bg-green-100 text-green-700 px-4 py-2 rounded-lg">
                    ✅ {file.name}
                </div>
            )}

            <input
                hidden
                type="file"
                accept=".pdf"
                onChange={(e) =>
                    setFile(e.target.files[0])
                }
            />
        </label>
    )
}

export default UploadDropzone