import React from "react";

import hasAnyPermission from "@/Utils/Permissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Table from "@/Components/Table";
import Button from "@/Components/Button";
import Pagination from "@/Components/Pagination";
import { Head, usePage } from "@inertiajs/react";
import Search from "@/Components/Search";

export default function Index({ auth }) {
    // destruct categories props
    const { categories, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Categories
                </h2>
            }
            >
            <Head title={"Categories"} />
            <Container>
                <div className="flex items-center justify-between gap-4 mb-4">
                    {hasAnyPermission(["categories create"]) && (
                        <Button type={"add"} url={route("categories.create")} />
                    )}
                    <div className="w-full md:w-4.6">
                        <Search
                        url={route("categories.index")}
                        placeholder={"Search categories by name..."}
                        filter={filters}
                        />
                    </div>
                </div>
                <Table.Card title={"categories"}>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Categories Name</Table.Th>
                                <Table.Th>Image</Table.Th>
                                <Table.Th>Action</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {categories.data.map((category, i) => (
                                <tr key={i}>
                                    <Table.Td>
                                        {++i + (categories.current_page - 1) * categories.per_page}
                                    </Table.Td>
                                    <Table.Td>{category.name}</Table.Td>
                                    <Table.Td>
                                        {category.image ? (
                                        <img
                                            src={`/storage/${category.image}`}
                                            alt={category.name}
                                            className="object-cover w-16 h-16 rounded-md"
                                        />
                                        ) : (
                                        <span className="text-gray-500">No Image</span>
                                        )}
                                    </Table.Td>
                                    <Table.Td>
                                        <div className="flex gap-2 item-center">
                                            {hasAnyPermission(["categories edit"]) && (
                                                <Button
                                                type={"edit"}
                                                url={route("categories.edit", category.id)}
                                                />
                                            )}
                                            {hasAnyPermission(["categories delete"]) && (
                                                <Button
                                                type={"delete"}
                                                url={route("categories.destroy", category.id)}
                                                />
                                            )}
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>
                <div className="fle item-center justity-center">
                    {categories.last_page !== 1 && (
                        <Pagination links={categories.links} />
                    )}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
