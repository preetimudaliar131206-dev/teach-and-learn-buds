import { useState, useEffect } from "react";
import { Linkedin, Globe, Users, Lock, Loader2, Link as LinkIcon } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { UserService } from "@/services/userService";
import { LinkedInVisibility } from "@/types/userTypes";
import { toast } from "sonner";

interface LinkedInSettingsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    userId: string;
    initialUrl?: string;
    initialVisibility?: LinkedInVisibility;
    onSuccess?: (url: string, visibility: LinkedInVisibility) => void;
}

export function LinkedInSettingsDialog({
    open,
    onOpenChange,
    userId,
    initialUrl = "",
    initialVisibility = "private",
    onSuccess,
}: LinkedInSettingsDialogProps) {
    const [url, setUrl] = useState(initialUrl);
    const [visibility, setVisibility] = useState<LinkedInVisibility>(initialVisibility);
    const [loading, setLoading] = useState(false);

    // Update internal state when props change
    useEffect(() => {
        setUrl(initialUrl);
        setVisibility(initialVisibility);
    }, [initialUrl, initialVisibility, open]);

    const handleSave = async () => {
        setLoading(true);
        try {
            const result = await UserService.updateLinkedInSettings(userId, {
                linkedinUrl: url || null,
                linkedinVisibility: visibility,
            });

            if (result.error) {
                toast.error(result.error.message);
            } else if (result.data) {
                toast.success("LinkedIn settings updated successfully!");
                onSuccess?.(result.data.linkedinUrl || "", result.data.linkedinVisibility);
                onOpenChange(false);
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className="w-12 h-12 rounded-xl bg-[#0077B5]/10 flex items-center justify-center mb-4">
                        <Linkedin className="w-6 h-6 text-[#0077B5]" />
                    </div>
                    <DialogTitle className="text-xl">LinkedIn Settings</DialogTitle>
                    <DialogDescription>
                        Manage how your LinkedIn profile is shared with the SkillSwap community.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* LinkedIn URL */}
                    <div className="space-y-2">
                        <Label htmlFor="linkedin-url" className="text-sm font-medium">
                            Profile URL
                        </Label>
                        <div className="relative">
                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                id="linkedin-url"
                                placeholder="https://linkedin.com/in/username"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="pl-10 h-11"
                            />
                        </div>
                        <p className="text-[10px] text-muted-foreground px-1">
                            Example: https://www.linkedin.com/in/johndoe
                        </p>
                    </div>

                    {/* Visibility Setting */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Who can see this?</Label>
                        <Select
                            value={visibility}
                            onValueChange={(value) => setVisibility(value as LinkedInVisibility)}
                        >
                            <SelectTrigger className="h-11">
                                <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="public">
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-primary" />
                                        <span>Public (Everyone)</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="connections">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-secondary-foreground" />
                                        <span>My Connections</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="private">
                                    <div className="flex items-center gap-2">
                                        <Lock className="w-4 h-4 text-muted-foreground" />
                                        <span>Only Me (Private)</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="hero"
                        onClick={handleSave}
                        disabled={loading}
                        className="min-w-[100px]"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
