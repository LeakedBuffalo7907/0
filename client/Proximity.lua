if periphemu then -- probably on CraftOS-PC
    periphemu.create("back","speaker")
    config.set("standardsMode",true)
end

local args = {...}
local Proximity = {}
local speaker = peripheral.find("speaker")
local ConnectedWebsocket
local buffer = {}

function Proximity.run() 
        local server = "ws://proximityvc.leakedbuffalo79.repl.co/"
        local ok, err = http.checkURL(server:gsub("^ws://", "http://"):gsub("^wss://", "https://"))

        if ok then
            local websocket = http.websocket(server)

            if websocket ~= false then
                term.clear()
                term.write("Connected To : ")
                term.setTextColor(colors.blue)
                print(server)
                term.setTextColor(colors.white)
                ConnectedWebsocket = websocket
                while true do
                    event, url, message = os.pullEvent("websocket_message")
                    if message ~= nil then
                        buffer = {("b"):rep(#message):unpack(message)}
                        buffer[#buffer] = nil
                        while not speaker.playAudio(buffer) do
                            os.pullEvent("speaker_audio_empty")
                        end
                    end

                end
            end
        else
        term.setCursorPos(1,1)
        print(err)
        end
    
end




command = table.remove(args, 1)
if Proximity[command] then
    Proximity[command](args)
end