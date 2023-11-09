import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { usePage } from "@inertiajs/react";

import { SimplePagination } from "@/Components/ui/pagination.jsx";

import { useState } from "react";

import { useFilter } from "@/hooks/useFilter.js";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Input } from "@/Components/ui/input.jsx";

import { SortIndicator } from "@/Components/ui/sort-indicator.jsx";

export default function Index(props) {
    const { data: users, meta, links } = props.users;

    const [params, setParams] = useState(props.state);
    useFilter({
        route: route("users.index"),
        values: params,
        only: ["users"],
    });

    const handleSort = (newField) => {
        let newDirection = params?.direction ?? "asc";
        const field = params?.field ?? "created_at";

        if (newField === field) {
            newDirection = newDirection === "asc" ? "desc" : "asc"; // used newDirection
        }

        setParams({ ...params, field: newField, direction: newDirection });
    };

    return (
        <div className="p-16">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <Select
                        value={params?.limit}
                        onValueChange={(e) =>
                            setParams({ ...params, limit: e })
                        }
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={params?.limit ?? 10} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="75">75</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Input
                        type="text"
                        value={params?.search}
                        onChange={(e) =>
                            setParams((prev) => ({
                                ...prev,
                                search: e.target.value,
                            }))
                        }
                        placeholder="Pencarian..."
                    />
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Users</CardTitle>
                    <CardDescription>
                        The list of users in your application.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">#</TableHead>
                                <TableHead onClick={() => handleSort("name")}>
                                    <SortIndicator
                                        label="Name"
                                        column="name"
                                        field={params?.field}
                                        direction={params?.direction}
                                    />
                                </TableHead>
                                <TableHead onClick={() => handleSort("email")}>
                                    <SortIndicator
                                        label="Email"
                                        column="email"
                                        field={params?.field}
                                        direction={params?.direction}
                                    />
                                </TableHead>
                                <TableHead
                                    onClick={() => handleSort("posts_count")}
                                >
                                    <SortIndicator
                                        label="Posts"
                                        field={params?.field}
                                        column="posts_count"
                                        direction={params?.direction}
                                    />
                                </TableHead>
                                <TableHead
                                    onClick={() => handleSort("created_at")}
                                >
                                    <SortIndicator
                                        label="Joined"
                                        column="created_at"
                                        field={params?.field}
                                        direction={params?.direction}
                                    />
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user, i) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">
                                        {meta.from + i}
                                    </TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.posts_count}</TableCell>
                                    <TableCell>{user.created_at}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="pt-6 border-t">
                    <CardFooter className="pt-6 border-t">
                        <SimplePagination links={links} meta={meta} />
                    </CardFooter>
                </CardFooter>
                <Select />
            </Card>
        </div>
    );
}
