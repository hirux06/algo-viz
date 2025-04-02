
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUp, FileText, Edit, Download, Trash2, ChevronRight, CheckCircle, AlertCircle, Clock, Sparkles } from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

export function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [atsScore, setAtsScore] = useState(68);
  
  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }, []);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }, []);

  const handleRemoveFile = useCallback(() => {
    setFile(null);
  }, []);

  const suggestions = [
    { 
      type: "keyword", 
      severity: "high", 
      text: "Add more technical skills relevant to the job description." 
    },
    { 
      type: "format", 
      severity: "medium", 
      text: "Use more bullet points in your work experience section." 
    },
    { 
      type: "content", 
      severity: "low", 
      text: "Consider adding metrics and achievements to showcase impact." 
    },
  ];

  return (
    <section id="dashboard" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Try Our Resume Optimizer
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg">
            Upload your resume to see how our AI can help improve it
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="mb-6 w-full justify-start">
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <FileUp className="h-4 w-4" />
                  Upload
                </TabsTrigger>
                <TabsTrigger value="analysis" disabled={!file} className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Analysis
                </TabsTrigger>
                <TabsTrigger value="edit" disabled={!file} className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Edit
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="mt-0">
                <div 
                  className={cn(
                    "border-2 border-dashed rounded-xl p-10 transition-all",
                    "flex flex-col items-center justify-center text-center",
                    isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20",
                    file ? "bg-muted/30" : "hover:bg-muted/10"
                  )}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                >
                  {!file ? (
                    <>
                      <div className="mb-4 rounded-full bg-primary/10 p-4">
                        <FileUp className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold">
                        Drag & drop your resume here
                      </h3>
                      <p className="mb-4 text-muted-foreground">
                        Support for PDF, DOCX, or TXT files (max 5MB)
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <label htmlFor="resume-upload" className="cursor-pointer">
                          <span className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                            Browse Files
                          </span>
                          <input 
                            id="resume-upload" 
                            type="file" 
                            accept=".pdf,.docx,.txt"
                            onChange={onFileChange} 
                            className="sr-only" 
                          />
                        </label>
                        <Button variant="outline">Paste Text</Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="mb-4 rounded-full bg-primary/10 p-3">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mb-1 text-lg font-semibold">{file.name}</h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        {Math.round(file.size / 1024)} KB • {file.type}
                      </p>
                      <div className="flex gap-2">
                        <Button onClick={() => console.log("Analyzing file...")}>
                          Analyze Resume
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={handleRemoveFile}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="analysis" className="mt-0 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Resume Analysis</CardTitle>
                    <CardDescription>
                      AI-powered insights about your resume
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">ATS Compatibility Score</div>
                        <div className="text-sm font-medium">{atsScore}%</div>
                      </div>
                      <Progress value={atsScore} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-base flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                            Strengths
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <ul className="text-sm space-y-2">
                            <li>Clear section headings</li>
                            <li>Good contact information</li>
                            <li>Proper file format</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-base flex items-center">
                            <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                            Areas to Improve
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <ul className="text-sm space-y-2">
                            <li>Missing key keywords</li>
                            <li>Improve bullet formatting</li>
                            <li>Add more metrics</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-base flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-blue-500" />
                            Estimated Time
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm">
                            About 15 minutes to implement all suggestions and optimize your resume.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-end">
                  <Button>
                    Edit Resume <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="edit" className="mt-0 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Interactive Resume Editor</CardTitle>
                    <CardDescription>
                      Make changes with real-time feedback
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/40 rounded p-8 h-96 flex items-center justify-center">
                      <p className="text-muted-foreground">
                        Interactive resume editor will appear here
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-end gap-4">
                  <Button variant="outline">
                    Preview
                  </Button>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Download Optimized Resume
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card className="h-full glass-card">
              <CardHeader>
                <CardTitle>AI Suggestions</CardTitle>
                <CardDescription>
                  Recommendations to improve your resume
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {suggestions.map((suggestion, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span 
                        className={cn(
                          "h-2 w-2 rounded-full",
                          suggestion.severity === "high" ? "bg-red-500" :
                          suggestion.severity === "medium" ? "bg-amber-500" : "bg-green-500"
                        )} 
                      />
                      <span className="text-sm font-medium capitalize">{suggestion.type}</span>
                      <span className={cn(
                        "ml-auto text-xs",
                        suggestion.severity === "high" ? "text-red-500" :
                        suggestion.severity === "medium" ? "text-amber-500" : "text-green-500"
                      )}>
                        {suggestion.severity} priority
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {suggestion.text}
                    </p>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-primary">
                      Apply this suggestion
                    </Button>
                  </div>
                ))}

                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate more suggestions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
