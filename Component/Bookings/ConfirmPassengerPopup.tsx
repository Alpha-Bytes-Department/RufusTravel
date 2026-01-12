import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const ConfirmPassengerPopup: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(true); // default: expanded

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <button
        onClick={showDrawer}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-2xl transition text-2xl"
      >
        Continue
      </button>

      <Drawer
        title="Confirm Passenger Details"
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
        width={520}
        extra={
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={onClose}
            className="text-gray-600 hover:text-black"
            size="large"
          />
        }
      >
        <div className="space-y-5">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Clickable Header */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full px-5 py-4 bg-gray-50 flex justify-between items-center hover:bg-gray-100 transition"
            >
              <h3 className="text-lg font-semibold">Adult 1</h3>

              {/* Arrow icons from react-icons */}
              <span className="text-2xl text-gray-600 transition-transform duration-300">
                {expanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </button>

            {/* Content - shown only when expanded */}
            {expanded && (
              <div className="p-5 pt-1 space-y-4 bg-white">
                <div>
                  <div className="text-sm text-gray-500">Name</div>
                  <div className="font-medium">MR. Nazrul Islam</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Date of Birth</div>
                  <div className="font-medium">27-09-1993</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Passport Number</div>
                  <div className="font-medium break-all">
                    21654654654963546
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">NIN Number</div>
                  <div className="font-medium break-all">
                    54456465465465464
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* You can easily add more passenger sections later */}
        </div>

        {/* Confirm button - sticky at bottom */}
        <div className="sticky bottom-0 left-0 right-0 bg-white pt-6 pb-4 px-1 border-t mt-8">
          <button
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition text-2xl"
          >
            Confirm
          </button>
        </div>
      </Drawer>
    </>
  );
};

export default ConfirmPassengerPopup;