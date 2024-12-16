import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Copy } from "lucide-react";
import { NavLink } from "react-router";

import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart";
import { toast } from "sonner";



  
const TEST_DATA = {
    name: "Bivash ROY",
    pseudo: "@bivash_roy",
    description: "User bio here : Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat assumenda odio fugit iusto dicta omnis reprehenderit ab laudantium ex! Et animi possimus quaerat nam corporis minima harum assumenda laborum nobis?"
}
export function Account(){
    const chartData = [{ year: "2024", used: 2680, remaining: 2440 }];
    const chartConfig = {
        used: {
            label: "used",
            color: "hsl(var(--chart-1))",
        },
        remaining: {
            label: "remaining",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig;
    const totalStorage = chartData[0].used + chartData[0].remaining

    function copy(value:string){
        // TODO
        toast("Copy successful", {
            description: "Yourpseudo has been copied",
        })

    }

    return(
        <div className="container mx-auto p-4">
            <div id="top" className="flex gap-8">
                <Avatar className="h-24 w-24">
                    <AvatarImage src="" />
                    <AvatarFallback>{TEST_DATA.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="text-lg font-bold">{TEST_DATA.name}</h3>
                    <p className="flex gap-2">
                        <span className="opacity-85">
                            {TEST_DATA.pseudo}
                        </span>
                        <Copy 
                            size={12} 
                            onClick={() => copy(TEST_DATA.pseudo)}
                            className="mt-1 opacity-80 hover:opacity-100 cursor-pointer" 
                        />
                        {/* <Check 
                            size={12} 
                            onClick={() => copy(TEST_DATA.pseudo)}
                            className="mt-1 opacity-80 hover:opacity-100 cursor-pointer" 
                        /> */}
                    </p>
                </div>
            </div>
            <p className="mt-4 sm:w-2/3 opacity-90">{TEST_DATA.description}</p>

            <div className="grid grid-cols-1 mt-12 mb-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>
                            Bio, user name, profile picture, pseudo...
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="grow justify-end items-end">
                        <Button variant="ghost" asChild>
                            <NavLink to="/account/profile">Manage</NavLink>
                        </Button>
                    </CardFooter>
                </Card>
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Security</CardTitle>
                        <CardDescription>
                            Authentification : password, two factor authentication...
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="grow justify-end items-end">
                        <Button variant="ghost" asChild>
                            <NavLink to="/account/security">Manage</NavLink>
                        </Button>
                    </CardFooter>
                </Card>
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Plan</CardTitle>
                        <CardDescription>
                            You are currently using the <span className="underline">Free</span> plan
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="grow justify-end items-end">
                        <Button variant="ghost" asChild>
                            <NavLink to="/account/plan">Upgrade</NavLink>
                        </Button>
                    </CardFooter>
                </Card>
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Billing</CardTitle>
                        <CardDescription>
                            You have no billing plan
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="grow justify-end items-end">
                        <Button variant="ghost" asChild>
                            <NavLink to="/account/billing">Add</NavLink>
                        </Button>
                    </CardFooter>
                </Card>
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Data</CardTitle>
                        <CardDescription>

                            <ChartContainer
                                config={chartConfig}
                                className="mx-auto aspect-square w-full max-w-[250px]"
                            >
                                <RadialBarChart
                                    data={chartData}
                                    endAngle={180}
                                    innerRadius={80}
                                    outerRadius={130}
                                >
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel />}
                                    />
                                    <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                        <Label
                                            content={({ viewBox }) => {
                                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                    return (
                                                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={(viewBox.cy || 0) - 16}
                                                            className="fill-foreground text-2xl font-bold"
                                                        >
                                                        {/* {totalStorage.toLocaleString()} */}
                                                        {Math.round(chartData[0].used/1024)}/{totalStorage/1024} Gb
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={(viewBox.cy || 0) + 4}
                                                            className="fill-muted-foreground"
                                                        >
                                                            {Math.round((chartData[0].used / totalStorage)*100)}% used
                                                        </tspan>
                                                    </text>
                                                    )
                                                }
                                            }}
                                        />
                                    </PolarRadiusAxis>
                                    <RadialBar
                                        dataKey="used"
                                        stackId="a"
                                        cornerRadius={5}
                                        fill="var(--color-used)"
                                        className="stroke-transparent stroke-2"
                                    />
                                    <RadialBar
                                        dataKey="remaining"
                                        fill="var(--color-remaining)"
                                        stackId="a"
                                        cornerRadius={5}
                                        className="stroke-transparent stroke-2"
                                    />
                                </RadialBarChart>
                            </ChartContainer>
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="grow justify-end items-end">
                        <Button variant="ghost" asChild>
                            <NavLink to="/account/billing">Manage</NavLink>
                        </Button>
                    </CardFooter>
                </Card>
            </div>


        </div>
    )
}