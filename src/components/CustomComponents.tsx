import React, { useState } from 'react';

import { 
  CheckCircle2, 
  AlertTriangle, 
  Info 
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Tabs } from 'flowbite-react';
import { TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip, Bar
} from 'recharts';
import { Label } from './ui/label';
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger
   } from "@/components/ui/alert-dialog"
   import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger
   } from "@/components/ui/dialog"
   import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger
   } from "@/components/ui/tooltip"
   import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue
      } from "@/components/ui/select"
      import { Switch } from "@/components/ui/switch"
import { Input } from './ui/input';


   const CustomComponents = () => {
   const [isToggled, setIsToggled] = useState(false)
   // Sample data for chart
   const chartData = [
   { name: 'Jan', value: 400 },
   { name: 'Feb', value: 300 },
   { name: 'Mar', value: 200 },
   { name: 'Apr', value: 278 },
   { name: 'May', value: 189 },
   { name: 'Jun', value: 239 }
   ]

  const [activeTab, setActiveTab] = useState('overview');

  return (
   <div className="p-8 space-y-8 max-w-4xl mx-auto">
   <h1 className="text-3xl font-bold text-foreground">
   Custom Component Showcase
   </h1>
   Copy  {/* Card Component */}
     <Card>
       <CardHeader>
         <CardTitle>Project Overview</CardTitle>
         <CardDescription>
           Comprehensive view of your current project metrics
         </CardDescription>
       </CardHeader>
       <CardContent>
         <ResponsiveContainer width="100%" height={300}>
           <BarChart data={chartData}>
             <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
             <YAxis stroke="hsl(var(--foreground))" />
             <RechartsTooltip 
               contentStyle={{ 
                 backgroundColor: 'hsl(var(--background))', 
                 color: 'hsl(var(--foreground))' 
               }} 
             />
             <Bar 
               dataKey="value" 
               fill="hsl(var(--chart-2))" 
               className="hover:opacity-80 transition-opacity"
             />
           </BarChart>
         </ResponsiveContainer>
       </CardContent>
       <CardFooter className="flex justify-between">
         <Button variant="outline">Cancel</Button>
         <Button>Deploy</Button>
       </CardFooter>
     </Card>
   
     {/* Interactive Components */}
     <div className="grid md:grid-cols-2 gap-6">
       {/* Input and Select */}
       <div className="space-y-4">
         <div>
           <Label>Email Address</Label>
           <Input 
             placeholder="Enter your email" 
             className="mt-2"
           />
         </div>
         
         <div>
           <Label>Department</Label>
           <Select>
             <SelectTrigger>
               <SelectValue placeholder="Select department" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="engineering">Engineering</SelectItem>
               <SelectItem value="design">Design</SelectItem>
               <SelectItem value="marketing">Marketing</SelectItem>
             </SelectContent>
           </Select>
         </div>
   
         <div className="flex items-center space-x-2">
           <Switch 
             checked={isToggled}
             onCheckedChange={setIsToggled}
           />
           <Label>
             {isToggled ? 'Enabled' : 'Disabled'}
           </Label>
         </div>
       </div>
   
       {/* Dialogs and Tooltips */}
       <div className="space-y-4">
         <AlertDialog>
           <AlertDialogTrigger asChild>
             <Button variant="destructive">Delete Project</Button>
           </AlertDialogTrigger>
           <AlertDialogContent>
             <AlertDialogHeader>
               <AlertDialogTitle>
                 Are you absolutely sure?
               </AlertDialogTitle>
               <AlertDialogDescription>
                 This action cannot be undone. This will permanently 
                 delete your project.
               </AlertDialogDescription>
             </AlertDialogHeader>
             <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction>Continue</AlertDialogAction>
             </AlertDialogFooter>
           </AlertDialogContent>
         </AlertDialog>
   
         <TooltipProvider>
           <Tooltip>
             <TooltipTrigger asChild>
               <Button variant="secondary">
                 Hover for Info
               </Button>
             </TooltipTrigger>
             <TooltipContent>
               <p>Additional information about this action</p>
             </TooltipContent>
           </Tooltip>
         </TooltipProvider>
   
         <Dialog>
           <DialogTrigger asChild>
             <Button>Open Modal</Button>
           </DialogTrigger>
           <DialogContent>
             <DialogHeader>
               <DialogTitle>Project Details</DialogTitle>
               <DialogDescription>
                 View and edit your project configuration
               </DialogDescription>
             </DialogHeader>
             {/* Modal content */}
           </DialogContent>
         </Dialog>
       </div>
     </div>
   
     {/* Tabs Component */}
     <Tabs defaultValue="analytics">
       <TabsList className="grid w-full grid-cols-2">
       <Tabs defaultValue="analytics">

         <TabsTrigger value="analytics">Analytics</TabsTrigger>
         <TabsTrigger value="settings">Settings</TabsTrigger>
         </Tabs>
       </TabsList>
       <TabsContent value="analytics">
         <Card>
           <CardContent className="space-y-2 pt-4">
             <p>Detailed analytics and insights for your project.</p>
           </CardContent>
         </Card>
       </TabsContent>
       <TabsContent value="settings">
         <Card>
           <CardContent className="space-y-2 pt-4">
             <p>Configure your project settings and preferences.</p>
           </CardContent>
         </Card>
       </TabsContent>
     </Tabs>
   </div>
   )
   };
export default CustomComponents;