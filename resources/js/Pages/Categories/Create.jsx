import React from "react"

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import { Head, useForm } from "@inertiajs/react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Swal from "sweetalert2";

export default function Create({auth}) {
    // define state with helper inertia
    const {data, setData, post, errors, progress} = useForm({
        name : "",
        image : null
    })

    // define method handleStoreData
    const handleStoreData = async (e) => {
        e.preventDefault();

        post(route("categories.store"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Success",
                    text: "Data created successfully!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Create Category</h2>}
        >
            <Head title={"Create Category"}/>
            <Container>
                <Card title={"Create new Category"}>
                    <form onSubmit={handleStoreData}>
                        <div className="mb-4">
                            <Input label={"Category Name"} type={"text"} value={data.name} onChange={e => setData("name", e.target.value)} errors={errors.name} placeholder="Input category name.."/>
                        </div>

                        {/* input gambar */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Category Image</label>
                            <input
                                type="file"
                                className="block w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                onChange={e => setData("image", e.target.files[0])}
                            />
                            {errors.image && <div className="mt-1 text-sm text-red-500">{errors.image}</div>}
                        </div>

                        {/* progress bar upload */}
                        {progress && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${progress}%` }}>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-2">
                            <Button type={"submit"} />
                            <Button type={"cancel"}  url={route("categories.index")}/>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    )
}
