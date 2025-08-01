import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, Mail, LogOut } from "lucide-react";

const ProfilePage = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { logout } = useAuth();
  const { data: userProfile, isLoading, error } = useUserProfile();

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setShowLogoutDialog(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutDialog(false);
  };

  return (
    <div className="p-6 h-full overflow-y-auto hide-scrollbar">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Profile</h2>
        <p className="text-gray-600 mt-1">Your account information</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {isLoading && (
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-gray-500">Loading profile...</div>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-red-500">Failed to load profile</div>
            </CardContent>
          </Card>
        )}

        {!isLoading && !error && userProfile && (
          <>
            {/* User Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                  <User className="w-5 h-5 text-gray-500" />

                    <p className="text-sm font-medium text-gray-700">Name</p>
                    </div>
                    <p className="text-gray-900 text-xs">{userProfile.data.name || "Not provided"}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                  <Mail className="w-5 h-5 text-gray-500" />

                    <p className="text-sm font-medium text-gray-700">Email</p>
                    </div>
                    <p className="text-gray-900 text-xs">{userProfile.data.email || "Not provided"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

                        {/* Logout Button */}
            <Button
              onClick={handleLogoutClick}
              variant="outline"
              className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>

            {/* Logout Confirmation Dialog */}
            <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Logout</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to logout? You will need to sign in again to access your account.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={handleLogoutCancel}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleLogoutConfirm}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Logout
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage; 